// import { initializeApp, applicationDefault } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
//
// initializeApp({ credential: applicationDefault() });
// const db = getFirestore();
//
// async function migrateUsers() {
//     const snapshot = await db.collection("users").get();
//
//     for (const doc of snapshot.docs) {
//         const data = doc.data();
//         const updates = {};
//
//         // Ensure email exists
//         if (!data.email) {
//             console.log(`User ${doc.id} missing email`);
//             // You could fetch from Firebase Auth if needed
//             // For now, leave blank or skip
//             updates.email = data.email ?? "";
//         }
//
//         // Ensure photoBase64 exists
//         if (typeof data.photoBase64 === "undefined") {
//             updates.photoBase64 = null;
//         }
//
//         if (Object.keys(updates).length > 0) {
//             await db.collection("users").doc(doc.id).set(updates, { merge: true });
//             console.log(`Updated user ${doc.id}`);
//         }
//     }
// }
//
// migrateUsers().then(() => {
//     console.log("Migration complete");
//     process.exit(0);
// });
