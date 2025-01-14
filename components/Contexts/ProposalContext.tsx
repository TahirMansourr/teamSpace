"use client";
import { createContext, useCallback, useContext, useState } from "react";

type ProposalContextDto = {};

const ProposalContext = createContext({});

export const useProposalContext = () => {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error(
      "useProposalContext must be used within a ProposalContextProvider"
    );
  }
  return context;
};

const ProposalProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<any>(null);
  const [isProposalUploaded, setIsProposalUploaded] = useState(false);

  const value = useCallback(
    () => ({
      proposal,
      setProposal,
      isProposalUploaded,
      setIsProposalUploaded,
      loading,
      setLoading,
    }),
    [
      proposal,
      isProposalUploaded,
      setIsProposalUploaded,
      setProposal,
      loading,
      setLoading,
    ]
  );
  return (
    <ProposalContext.Provider value={value}>
      {children}
    </ProposalContext.Provider>
  );
};

export default ProposalProvider;
