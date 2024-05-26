import './App.css'

import * as React from "react";

function MainComponent() {
  const [inputPrompt, setInputPrompt] = React.useState("");
  const [generatedResponse, setGeneratedResponse] = React.useState("");

  const handleGenerateClick = async () => {
    alert(inputPrompt)
    const response = await fetch("http://127.0.0.1:5000/generate_text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "prompt": inputPrompt }),
    });

    const data = await response.json();
    if (data && data.response) {
      setGeneratedResponse(data.response);
      console.log(data.response);
    } else {
      console.error('Failed to generate text. Data:', data);
    }
  };
 return (
  <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-roboto">
   <header className="flex justify-between items-center p-4 bg-[#161b22]">
    <img
     src="https://brandlogovector.com/wp-content/uploads/2022/06/Amity-University-Icon-Logo-Small.png"
     alt="Company logo"
     className="h-12"
    />
    <div>
     <button className="px-4 py-2 mx-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm">
      New App
     </button>
     <button className="px-4 py-2 mx-2 bg-[#21262d] hover:bg-[#30363d] rounded text-sm">
      Login Profile
     </button>
    </div>
   </header>
   <main className="p-4">
    <div className="mb-8">
     <div className="rounded-lg overflow-hidden border border-[#30363d] bg-gradient-to-r from-[#161b22] via-[#2c2f33] to-[#161b22] h-[200px] w-full max-w-[768px] mx-auto flex justify-center items-center">
      {/* <div className="bg-[#21262d] h-[140px] w-[140px] rounded-full"></div> */}
      <p className="text-sm p-4">{generatedResponse ? generatedResponse : "Click Generate to see response..."}</p>
     </div>
    </div>
    <div className="mb-8">
    <input
      type="text"
      name="inputPrompt"
      className="w-full p-4 bg-[#161b22] border border-[#30363d] rounded my-2 text-sm placeholder-[#8b949e]"
      placeholder="Enter your prompt"
      value={inputPrompt}
      onChange={(e) => setInputPrompt(e.target.value)}
    />
     <div className="w-full h-1 bg-[#21262d] rounded-full overflow-hidden mb-4 bg-gradient-to-r from-[#161b22] via-[#2c2f33] to-[#161b22]">
      <div className="bg-[#58a6ff] h-full rounded-full"></div>
     </div>
     <button
      onClick={handleGenerateClick}
      className="w-full bg-[#21262d] hover:bg-[#30363d] rounded py-2 flex items-center justify-center"
     >
      <i className="fa fa-arrow-right mr-2"></i> Generate
     </button>
    </div>
    <div className="mb-8">
     <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {[...Array.from({ length: 15 })].map((_, i) => (
       <div
        key={i}
        className="w-full h-[96px] bg-[#21262d] rounded-md flex items-center justify-center text-xs"
       >
        Prompt {i + 1}
       </div>
      ))}
     </div>
    </div>
    <div className="mb-8">
     {[...Array.from({ length: 3 })].map((_, i) => (
      <details key={i} className="group mb-4">
       <summary className="flex justify-between items-center p-4 w-full bg-[#21262d] rounded cursor-pointer text-sm">
        FAQ {i + 1}
        <i className="fa fa-chevron-down"></i>
       </summary>
       <div className="p-4 bg-[#161b22] rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
       </div>
      </details>
     ))}
    </div>
    <div className="bg-[#161b22] p-4 rounded text-center">
     <div className="rounded-full overflow-hidden border border-[#30363d] inline-block">
      <img
       src="https://avatars.githubusercontent.com/u/60035881?v=4"
       alt="Portrait of the app creator"
       className="w-40 h-40 object-cover"
      />
     </div>
     <p className="my-4 text-l font-bold">
      Ish Kapoor
     </p>
     <p className="my-4 text-sm">
      I am the real Thala. PM at AM.
     </p>
     <div className="flex justify-center items-center space-x-4">
      <i className="fa fa-twitter text-[#58a6ff] hover:text-[#1f6feb]"></i>
      <i className="fa fa-linkedin text-[#0a66c2] hover:text-[#004182]"></i>
      <i className="fa fa-github text-[#8b949e] hover:text-[#c9d1d9]"></i>
     </div>
    </div>
   </main>
  </div>
 );
}

export default function App() {
  return (
    <MainComponent />
  )
}
