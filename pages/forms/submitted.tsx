import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Spinner } from "../../components/Spinner";

const SubmittedForm: NextPage = () => {
  return (
    <Layout>
      <div className="flex items-center flex-col mt-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z" />
        </svg>
        <div className="mt-8 text-center">
          Thanks you, your form has been submitted! <br /> We'll notify you when
          we have received and reviewed your submission!
        </div>
      </div>
    </Layout>
  );
};

export default SubmittedForm;
