import { generateEncryptionKey } from "../../../../utils/crypto";
import { addItem, createUserObjectStore } from "../../../../utils/indexedDB";

export async function saveEncryptionKeyToIDBStore(
  userId: string,
  masterPassword: string,
): Promise<boolean | undefined> {
  try {
    // 1. create indexedDB crypto key obj store
    await createUserObjectStore();
    if (masterPassword) {
      // 2. create encryption key derived from master password hash
      const keyData = await generateEncryptionKey(masterPassword);
      console.log("createUser service | generateEncryptionKey result:", keyData);
      if (keyData) {
        // 3. save wrapped encryption key into indexedDB
        await addItem({ userId, keyData });
        return true;
      }
    }
  } catch (err) {
    console.error("saveEncryptionKeyToIDBStore error", err);
    throw err;
  }
}

// export async function createUser(email: string, password: string, preferences: UserPreferences) {
//   try {
//     // 1. create indexedDB crypto key obj store
//     await createUserObjectStore();
//     // 2. hash/derive user master password using pbkdf2
//     const masterPasswordHash = await hashMasterPassword(password);
//     console.log("createUser service | masterPassword pbkdf2Hash result:", masterPasswordHash);
//     if (masterPasswordHash) {
//       // 3. create encryption key derived from master password hash
//       const keyData = await generateEncryptionKey(masterPasswordHash);
//       console.log("createUser service | generateEncryptionKey result:", keyData);
//       if (keyData) {
//         console.log("createUser service | Key successfully saved to indexedDB");
//         // 5. register user to api
//         const res = await registerUser(email, masterPasswordHash, preferences);
//         console.log("createUser service | Api register user res:", res);

//         if (res.success && res.user) {
//           // 4. save wrapped encryption key into indexedDB
//           await addItem({ userId: res.user._id, keyData });
//           return res;
//         }
//       }
//     }
//   } catch (err) {
//     console.error("Create User err:", err);
//   }
// }
