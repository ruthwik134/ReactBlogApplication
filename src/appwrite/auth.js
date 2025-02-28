import conf from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
   client = new Client();
   account;

   constructor() {
      this.client
         .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
         .setProject(conf.appwriteProjectid);

      this.account = new Account(this.client);
   }

   // Create a new user account
   async createAccount({ email, password, name }) {
      try {
         // Await the user creation process
         const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name
         );

         if (userAccount) {
            // Ensure session is not duplicated
            const currentUser = await this.getcurrentuser();
            if (!currentUser) {
               await this.login({ email, password });
            }
            return userAccount;
         } else {
            return null;
         }
      } catch (error) {
         throw error;
      }
   }

   // Login user
   async login({ email, password }) {
      try {
         // Check if a session already exists
         const currentUser = await this.getcurrentuser();
         if (currentUser) {
            console.log("User already logged in.");
            return currentUser;
         }

         const session = await this.account.createEmailPasswordSession(
            email,
            password
         );

         return session;
      } catch (error) {
         throw error;
      }
   }

   // Get the current logged-in user
   async getcurrentuser() {
      try {
         return await this.account.get();
      } catch (error) {
         console.log("Error fetching current user:", error);
         return null;
      }
   }

   // Logout user
   async logout() {
    try {
        const currentUser = await this.getcurrentuser(); // Check if user is logged in
        if (!currentUser) {
            console.log("No user is currently logged in. Skipping logout.");
            return;
        }
        
        await this.account.deleteSessions();
        console.log("User successfully logged out.");
    } catch (error) {
        console.log("Error logging out:", error);
    }
}

}

// Exporting an instance of AuthService
const authService = new AuthService();
export default authService;
