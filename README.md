# 🏥 Medical Report Analyzer using RAG Knowledge Base

## 📝 Introduction
This project analyzes **medical reports** using a **RAG (Retrieval Augmented Generation) knowledge base**. Born out of a personal experience when my mother was diagnosed with **blood cancer**, I created this app to deliver **accurate medical insights** in situations where professional help is inaccessible. General AI models failed to provide precise medical interpretations, pushing me to build a more reliable system for understanding complex medical data.

---

## ❓ Problem
Medical reports like blood tests or diagnostic profiles are hard to interpret without expert advice. Generic AI models often lack the required **context** and **accuracy**, making it difficult to understand critical medical terms during stressful times.

---

## 💡 Solution
I developed an app using **RAG (Retrieval Augmented Generation)** that allows users to upload their medical reports (PDF or text) and retrieve **accurate information** from a **trusted medical knowledge base**. This approach ensures **context-specific answers** by leveraging similarity search over curated medical sources such as textbooks and research papers.

---

## 🔑 Key Features

- **Medical Knowledge Base**: A comprehensive collection of **medical documents** and **diagnostic manuals**, stored in a searchable format using Pinecone.
- **PDF/Text Uploads**: Users can upload medical reports to analyze them and fetch relevant insights.
- **AI-Powered Analysis**: The system uses **semantic search** to pull content from the knowledge base, delivering precise and reliable medical information.
- **Transparency**: Users can view the exact source of the information provided, building **trust** and offering complete transparency.

---

## ⚙️ Tech Stack

- **Next.js**: A powerful framework for building interactive user interfaces and handling server-side rendering.
- **Pinecone**: Vector database for similarity search, allowing quick retrieval of contextually appropriate information.
- **ONNX**: Utilized for local execution of a large embedding model, enabling secure and cost-effective document processing.
- **Langchain**: Simplifies document chunking and embedding for efficient search and retrieval.
- **ShadCN UI**: Provides pre-built UI components to create a clean and responsive interface.
- **Typescript**: Ensures type safety across the project, improving stability and reducing errors.

---

## 🏗️ Architecture

1. **Frontend (Next.js)**: Users upload their medical reports via the frontend.
2. **Backend (RAG Model)**: The reports are split into chunks, embedded using an **ONNX-based model**, and stored in Pinecone.
3. **Knowledge Base**: On query, relevant information is retrieved from the medical knowledge base and displayed to the user.

---

## 🎥 Demo
1. **Upload**: Users can upload medical reports (PDF or text).
2. **Process**: The app processes the document, embedding its content in the knowledge base.
3. **Query**: Users can ask medical questions, and the app retrieves **relevant information** from trusted sources like medical literature.

---

## 🚀 Future Enhancements
- Expand the medical knowledge base with **user contributions**.
- Develop a **mobile version** for more accessibility.
- Introduce **fine-tuning** for specific medical conditions to further improve response accuracy.

---

## 🧗‍♂️ Challenges

- **Model Size**: Running the 1.3GB ONNX model locally for large documents required considerable processing time.
- **Data Privacy**: Ensuring **sensitive medical data** is processed locally, without sending it to external servers, was critical.

---

## 🛠️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/medical-report-analyzer.git
