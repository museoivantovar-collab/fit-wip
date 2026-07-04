/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type CloudflareEnv = {
  MAILCHIMP_API_KEY: string;
  MAILCHIMP_LIST_ID: string;
  MAILCHIMP_DC: string;
  RESEND_API_KEY: string;
};

declare namespace App {
  interface Locals {
    runtime: {
      env: CloudflareEnv;
    };
  }
}
