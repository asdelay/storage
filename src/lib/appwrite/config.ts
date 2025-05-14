export const appwriteConfig = {
    endpointUrl: process.env.NEXT_PUBLIC_ARRWRITE_ENDPOINT!,
    projectId: process.env.NEXT_PUBLIC_ARRWRITE_PROJECT!,
    databaseId: process.env.NEXT_PUBLIC_ARRWRITE_DATABASE!,
    usersCollectionId: process.env.NEXT_PUBLIC_ARRWRITE_USERS_COLLECTION!,
    filesCollectionId: process.env.NEXT_PUBLIC_ARRWRITE_FILES_COLLECTION!,
    bucketId: process.env.NEXT_PUBLIC_ARRWRITE_BUCKET!,
    secretKey: process.env.NEXT_APPWRITE_SECRET!,
};