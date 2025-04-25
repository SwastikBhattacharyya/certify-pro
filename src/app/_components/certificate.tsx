"use client";

import { createContext, useContext, useRef } from "react";

type CertificateContextType = {
  certificateRef: React.RefObject<HTMLDivElement | null>;
  recipientNameRef: React.RefObject<SVGTextElement | null>;
  dateRef: React.RefObject<SVGTextElement | null>;
  descriptionRef: React.RefObject<SVGTextElement | null>;
  backgroundImageRef: React.RefObject<SVGImageElement | null>;
  signatureRef: React.RefObject<SVGImageElement | null>;
};

export const CertificateContext = createContext<CertificateContextType>({
  certificateRef: { current: null },
  recipientNameRef: { current: null },
  dateRef: { current: null },
  descriptionRef: { current: null },
  backgroundImageRef: { current: null },
  signatureRef: { current: null },
});

export function CertificateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const recipientNameRef = useRef<SVGTextElement | null>(null);
  const dateRef = useRef<SVGTextElement | null>(null);
  const descriptionRef = useRef<SVGTextElement | null>(null);
  const backgroundImageRef = useRef<SVGImageElement | null>(null);
  const signatureRef = useRef<SVGImageElement | null>(null);

  return (
    <CertificateContext.Provider
      value={{
        certificateRef,
        recipientNameRef,
        dateRef,
        descriptionRef,
        backgroundImageRef,
        signatureRef,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
}

export function Certificate() {
  const {
    certificateRef,
    recipientNameRef,
    dateRef,
    descriptionRef,
    backgroundImageRef,
    signatureRef,
  } = useContext(CertificateContext);

  return (
    <div className="w-full" ref={certificateRef}>
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="auto"
        style={{ userSelect: "none" }}
      >
        <defs>
          <pattern
            id="backgroundImage"
            patternUnits="userSpaceOnUse"
            width="800"
            height="600"
          >
            <image
              ref={backgroundImageRef}
              href="/template-1.jpg"
              x="0"
              y="0"
              width="800"
              height="600"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="800"
          height="600"
          fill="url(#backgroundImage)"
        />

        <text
          x="400"
          y="80"
          textAnchor="middle"
          fontSize="36"
          fontWeight="bold"
          fill="#000"
        >
          CERTIFICATE
        </text>
        <text x="400" y="120" textAnchor="middle" fontSize="36" fill="#000">
          OF ACHIEVEMENT
        </text>

        <text ref={dateRef} x="30" y="100" fontSize="24" fill="#000">
          [DATE]
        </text>

        <text x="400" y="250" textAnchor="middle" fontSize="24" fill="#000">
          This certificate is proudly presented to
        </text>
        <text
          ref={recipientNameRef}
          x="400"
          y="300"
          textAnchor="middle"
          fontSize="36"
          fontWeight="bold"
          fill="#000"
        >
          [Recipient Name]
        </text>
        <rect x="10%" y="315" width="80%" height="2" fill="black" />
        <text
          ref={descriptionRef}
          x="400"
          y="360"
          textAnchor="middle"
          fontSize="20"
          fill="#000"
        >
          [Description]
        </text>

        <image
          href="/medal.jpg"
          x="50%"
          y="430"
          width="150"
          height="150"
          transform="translate(-75, 0)"
        />

        <rect x="60%" y="555" width="35%" height="3" fill="black" />
        <image
          href="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          ref={signatureRef}
          x="62.5%"
          y="460"
          width="30%"
          height="90"
        />
      </svg>
    </div>
  );
}
