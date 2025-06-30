'use client';

import { Suspense } from "react";
import AddCustomerForm from "./components/AddCustomerForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddCustomerForm />
    </Suspense>
  );
} 