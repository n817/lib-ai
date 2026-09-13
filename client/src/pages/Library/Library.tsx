import { useState, useEffect } from "react";

import "./Library.css";

import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, type LibraryDoc } from "../../utils/api";

export default function Library() {
  const [documents, setDocuments] = useState<LibraryDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const handleFileSelect = (file: File) => {
    const newDoc: LibraryDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: "local",
      createdAt: new Date().toISOString(),
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="library">
      <h1 className="library__title">Manage Your Library</h1>
      <section className="library__content">
        <p className="library__text">
          Upload documents (PDF)
        </p>
        <UploadArea onFileSelect={handleFileSelect}></UploadArea>

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
          <p className="library__text library__text_type_error">
            {error}
          </p>
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
        <button className="library__save-button">Save</button>
      </section>
    </div>
  );
}
