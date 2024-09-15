export default function Security() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-1 flex-col gap-8 px-8 text-foreground/70">
      <h1 className="text-4xl font-bold text-brand-red-100 drop-shadow-red-glow">
        Security
      </h1>
      <div>
        <p>
        At Would You (Rivo), we are dedicated to ensuring the highest level of security for our customers. As part of this commitment, we encourage you to submit security reports if you encounter any vulnerabilities, concerns, or potential risks related to our service. Whether it&apos;s a bug, security flaw, or any issue impacting the safety of your data, your report helps us maintain a robust and secure environment. We value your input and take all reports seriously, ensuring a prompt and thorough investigation to address any identified issues. Your vigilance supports our mission to keep Rivo safe and secure for everyone.
        </p>
        <br />
        <iframe src="https://hackerone.com/765140a7-b8f7-4937-9fbd-ca6eb0b8df3d/embedded_submissions/new" title="Submit Vulnerability Report" className='border-none h-[1080px] w-full' />
      </div>
    </main>
  )
}
