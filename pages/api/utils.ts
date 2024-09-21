import { Pinecone } from "@pinecone-database/pinecone";
import {pipeline} from "@xenova/transformers";
import { Document } from "langchain/document";

export async function updateVectorDB(
    client: Pinecone,
    indexname: string,
    namespace:string,
    docs:Document[],
    progressCallback:(filename: string,totalChunks: number, chunkUpserted:number, isComplete: boolean)=>void
){
    const modelname='mixedbread-ai/mxbai-embed-large-v1';
    const extractor = await pipeline('feature-extraction', modelname, {
        quantized: false
    });
    console.log(extractor);
}