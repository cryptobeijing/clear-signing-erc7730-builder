"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useErc7730Store from "~/store/erc7730";

const MetadataForm = () => {
  const router = useRouter();
  const { getMetadata } = useErc7730Store();
  const metadata = getMetadata();

  useEffect(() => {
    if (metadata === null) {
      router.push("/");
    }
  }, [metadata, router]);

  if (metadata === null) {
    return null;
  }

  return <div>form</div>;
};

export default MetadataForm;
