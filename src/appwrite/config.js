import conf from '../config/config.js'
import {Client,ID,Databases,Storage,Query} from "appwrite";
import { useNavigate,useParams } from 'react-router-dom'

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
              .setEndpoint(conf.appwriteUrl)
              .setProject(conf.appwriteProjectid);    
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);

       

              
    }
    async createpost({title,slug,content,featuredImage,status,userid}){
        console.log("another function");
        console.log(slug);
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    userid,

                }
            )

        }
        catch(error){
            console.log("hi babes");
            throw new Error(error.message || "Something went wrong while creating the post.");


        }
    }

    async updatepost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,



                }
                
            )
        }
        catch(error){
            console.log("the error is",error);
        }

      

    }

    async deletepost(slug){
        try{
             await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,

            )
            console.log("deleting the post");
            
            return true;
        }
        catch(error){
            //console.log("the deleted side eeroor:",error);
            return false;
        }
    }


    async getpost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,
            );
        }
        catch(error){
            console("the error in the getting :",error);
        }
    }

    async getposts(queries=[Query.equal("status","active")]){

        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                queries,


            )

        }
        catch(error){
            console.log("the error is the one",error);
            return false;
        }

    }

    async fileupload(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketid,
                ID.unique(),
                file,
            )



        }
        catch(error){
            console.log("the error is the",error);
            return false;

        }


    }

    async filedelete(fileid){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketid,
                fileid,

                
            )
            Navigate()
            return true;

        }
        catch(error){
            console.log("the error is guven as",error);

        }

    }

    getfilepreview(fileid){
        try{
            return  this.bucket.getFilePreview(
                conf.appwriteBucketid,
                fileid,

                
            )

        }
        catch(error){
            console.log("the error is the" , error);
        }


    }

}

const service = new Service()
export default service