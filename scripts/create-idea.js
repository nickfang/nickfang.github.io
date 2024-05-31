const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter idea name (e.g., "Gradient Buttons"): ', (ideaName) => {
  const fileName = ideaName.toLowerCase().replace(/\s+/g, '-').trim();

  const ideasDir = `src/app/ideas/${fileName}`;
  const filePath = `${ideasDir}/page.tsx`;

  console.log(ideasDir);
  // Create directory (if it doesn't exist)
  fs.mkdirSync(ideasDir, { recursive: true });

  // Create file
  fs.writeFile(filePath, '', (err) => {
    if (err) throw err;

    const initialContent = `
'use client'; // Optional for client-side interactions

import Head from 'next/head';

export default function ${ideaName.replace(/\s+/g, '')}() {
  return (
    <main>
      <Head>
        <title>${ideaName}</title>
      </Head>
      <h1>${ideaName}</h1>
      {/* Your idea code here */}
    </main>
  );
}
`;

    fs.writeFile(filePath, initialContent, (err) => {
      if (err) throw err;
      exec(`code ${filePath}`); // Open in editor
      console.log(`Created idea page: ${filePath}`);
      rl.close();
    });
  });
});
