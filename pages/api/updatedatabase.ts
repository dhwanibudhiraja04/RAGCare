import { updateVectorDB } from "@/utils";
import { Pinecone } from "@pinecone-database/pinecone";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { indexname, namespace } = JSON.parse(req.body);
            await handleUpload(indexname, namespace, res);
        } catch (error) {
            console.error("Error in API handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
};

async function handleUpload(indexname: string, namespace: string, res: NextApiResponse) {
    try {
        const loader = new DirectoryLoader('./documents', {
            '.pdf': (path: string) => new PDFLoader(path, {
                splitPages: false
            }),
            '.txt': (path: string) => new TextLoader(path)
        });

        const docs = await loader.load();
        const client = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        });

        await updateVectorDB(client, indexname, namespace, docs, (filename, totalChunks, chunksUpserted, isComplete) => {
            console.log(`${filename}-${totalChunks}-${chunksUpserted}-${isComplete}`);
            
            if (!isComplete) {
                res.write(
                    JSON.stringify({
                        filename,
                        totalChunks,
                        chunksUpserted,
                        isComplete
                    })
                );
            } else {
                res.write(JSON.stringify({ message: "Upload Complete" }));
                res.end(); // Ensure the response is closed when the upload is complete.
            }
        });

    } catch (error) {
        console.error("Error during upload:", error);
        res.status(500).json({ error: "Failed to update database" });
    }
}
