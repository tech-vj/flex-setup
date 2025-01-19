import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      {/* Add external and inline scripts */}
      <Head>
        {/* Include Tailwind CSS */}
        <script defer src="https://cdn.tailwindcss.com"></script>
        {/* Include Chatbot embed script */}
        <script defer src="https://c20.live/script/chatbot-embed.js"></script>
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                if (window.initializeChatbot) {
                  window.initializeChatbot("678d03a2ed4463f30d184c58");
                  return;
                }
                const checkInitialize = setInterval(function() {
                  if (window.initializeChatbot) {
                    window.initializeChatbot("678d03a2ed4463f30d184c58");
                    clearInterval(checkInitialize);
                  }
                }, 100);
                setTimeout(() => clearInterval(checkInitialize), 10000);
              });
            `,
          }}
        />
      </Head>
      {/* Page content */}
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-semibold">Welcome to the Testing Page!</h1>
      </div>
    </>
  );
};

export default Dashboard;
