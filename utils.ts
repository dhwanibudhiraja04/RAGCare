import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { FeatureExtractionPipeline, pipeline } from "@xenova/transformers";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function updateVectorDB(
    client: Pinecone,
    indexname: string,
    namespace: string,
    docs: Document[],
    progressCallback: (fileName: string, totalChunks: number, chunkUpserted: number, isComplete: boolean) => void // Fixed parameter name
) {
    const modelname = 'mixedbread-ai/mxbai-embed-large-v1';
    const extractor = await pipeline('feature-extraction', modelname, {
        quantized: false
    });
    console.log(extractor);

    for (const doc of docs) {
        await processDocument(client, indexname, namespace, doc, extractor);
    }
}

async function processDocument(client: Pinecone, indexname: string, namespace: string, doc: Document<Record<string, any>>, extractor: FeatureExtractionPipeline) {
    const splitter = new RecursiveCharacterTextSplitter();
    const documentChunks= await splitter.splitText(doc.pageContent);
    const filename= getFilename(doc.metadata.source);
    console.log(documentChunks.length);
} 

function getFilename(filename:string):string{
    const docname= filename.substring(filename.lastIndexOf("/")+1);
    return docname.substring(0, docname.lastIndexOf(".")) || docname;
}
