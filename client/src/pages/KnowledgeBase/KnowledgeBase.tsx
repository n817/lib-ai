import { useState, useEffect } from "react";

import "./KnowledgeBase.css";

import UploadArea from "../../components/UploadArea/UploadArea";
import { getDocuments, type KnowledgeDoc } from "../../utils/api";

export default function KnowledgeBase() {
  const [documents, setDocuments] = useState<KnowledgeDoc[]>([]);
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
    const newDoc: KnowledgeDoc = {
      _id: Date.now().toString(),
      title: file.name,
      fileName: file.name,
      userId: "local",
      createdAt: new Date().toISOString(),
    };
    setDocuments([newDoc, ...documents]);
  };

  return (
    <div className="knowledge-base">
      <h1 className="knowledge-base__title">Manage Your Knowledge Base</h1>
      <section className="knowledge-base__content">
        <p className="knowledge-base__text">
          Upload documents (PDF)
        </p>
        <UploadArea onFileSelect={handleFileSelect}></UploadArea>

        {isLoading && (
          <p className="knowledge-base__text knowledge-base__text_type_message">
            Loading documents…
          </p>
        )}

        {!isLoading && !error && documents.length === 0 && (
          <p className="knowledge-base__text knowledge-base__text_type_message">
            No documents yet.
          </p>
        )}

        {!isLoading && error && (
          <p className="knowledge-base__text knowledge-base__text_type_error">
            {error}
          </p>
        )}

        {/* Rendering the list */}
        {!isLoading && !error && documents.length > 0 && (
          <ul className="knowledge-base__list">
            {documents.map((doc) => (
              <li key={doc._id} className="knowledge-base__list-item">
                {doc.fileName}
                <button
                  type="button"
                  className="knowledge-base__delete-button"
                  aria-label="delete document"
                ></button>
              </li>
            ))}
          </ul>
        )}
        <button className="knowledge-base__save-button">Save</button>
      </section>
    </div>
  );
}
