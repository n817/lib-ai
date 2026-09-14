import { useState, useEffect } from "react";

import "./Library.css";

import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, uploadDocument, type LibraryDoc } from "../../utils/api";

export default function Library() {
  const [documents, setDocuments] = useState<LibraryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDocuments();
        setDocuments(res.data || []);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    try {
      const res = await uploadDocument(file);
      if (res.data) {
        setDocuments([res.data!, ...documents]);
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="library">
      <h1 className="library__title">Manage My Library</h1>
      <section className="library__content">
        <p className="library__text">Upload documents (PDF)</p>
        <UploadArea onFileSelect={handleFileSelect} isUploading={isUploading} />

        {isLoading && (
          <p className="library__text library__text_type_message">
            Loading documents…
          </p>
        )}

        {!isLoading && !error && documents.length === 0 && (
          <p className="library__text library__text_type_message">
            No documents yet.
          </p>
        )}

        {!isLoading && error && (
          <p className="library__text library__text_type_error">{error}</p>
        )}

        {/* Rendering the list */}
        {!isLoading && !error && documents.length > 0 && (
          <ul className="library__list">
            {documents.map((doc) => (
              <li key={doc._id} className="library__list-item">
                {doc.fileName}
                <button
                  type="button"
                  className="library__delete-button"
                  aria-label="delete document"
                ></button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
