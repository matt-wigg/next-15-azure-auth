# Next-15-Azure-Auth

Next-15-Azure-Auth is a starter template for building secure Next.js v15+ Tailwind apps with Microsoft Entra ID authentication. It uses the [Next-Auth.js Library](https://next-auth.js.org/) for authentication and the [Microsoft Graph Client Library](https://github.com/microsoftgraph/msgraph-sdk-javascript) for fetching user data.

## Prerequisites

Ensure the following are installed before running the application locally:

- [Node.js](https://nodejs.org/) (v24 LTS) & [npm](https://www.npmjs.com/).
- Azure account with app registration permissions in Microsoft Entra ID.

## Azure Setup for Microsoft Entra ID

1. **Register the Application**

   - Navigate to the [Azure portal](https://portal.azure.com/).
   - Go to **Microsoft Entra ID** > **App registrations** > **New registration**.
   - Name your application (e.g., `Next-15-Azure-Auth`).
   - For **Supported account types**, choose **Accounts in this organizational directory only**.
   - In the **Redirect URI** field, set the following value:  
     `http://localhost:3000/api/auth/callback/microsoft-entra-id`
   - Click **Register** to create the application.

2. **Configure the Application**

   - Once registered, navigate to the app's overview page:
     - Copy the **Application (client) ID** and set it in your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_ID`.
     - Copy the **Directory (tenant) ID** and set it in your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_ISSUER`.
   - Next, go to **Certificates & secrets**:
     - Under **Client secrets**, click **New client secret**.
     - Provide a description (e.g., `Next-15-Azure-Auth Secret`) and choose an expiration period.
     - Once created, copy the generated secret value and set it in your `.env` file as `AUTH_MICROSOFT_ENTRA_ID_SECRET`.

3. **Set Up API Permissions**

   - Navigate to **API permissions** > **Add a permission**.
   - Choose **Microsoft Graph** > **Delegated permissions**.
   - Add the following permissions:
     - `User.Read` - for accessing user details
     - `openid` - for OpenID Connect authentication
     - `email` - for email access
     - `profile` - for basic profile info
     - `offline_access` - for refresh tokens
   - After adding the permissions, click **Grant admin consent for [Your Organization]** to apply them.

4. **(Optional) Create an Enterprise Application**

   - To manage access to the application:
     - Go to **Azure Active Directory** > **Enterprise applications**.
     - Find your application by name and select it.
     - Under **Users and groups**, assign users or groups that should have access to the application.

## Local Development Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/matt-wigg/next-15-azure-auth.git
   cd next-15-azure-auth
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a (or edit the) `.env` file in the root directory:

   ```bash
   AUTH_SECRET=your_auth_secret
   AUTH_MICROSOFT_ENTRA_ID_ID=your_azure_client_id
   AUTH_MICROSOFT_ENTRA_ID_SECRET=your_azure_client_secret
   AUTH_MICROSOFT_ENTRA_ID_ISSUER=your_azure_tenant_id
   ```

   To generate the `AUTH_SECRET`, run:

   ```bash
   openssl rand -base64 32
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   ```

   Your application will be available at `http://localhost:3000`.

## Runtime maintenance (October 2026)

The repository keeps its original template name; the deployed runtime is now Next.js 16 and React 19. Node.js 24 LTS is required. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:smoke`, and `npm audit` before deploying. The smoke suite uses synthetic local authentication configuration, never signs in or calls Microsoft Graph.

Auth.js remains on the existing v5 API track, pinned to security-patched `5.0.0-beta.32`; the stable npm tag is v4 and does not expose the v5 `auth`/server-action API used by this template. TypeScript 6.0.3 and ESLint 9.39.5 are the newest compatible versions for the current typescript-eslint and React/import lint plugins; their declared peer ranges do not support TypeScript 7 or ESLint 10. ESLint 9 is end-of-life upstream; this is a documented lint-tooling compatibility limitation until those plugins support ESLint 10, not a claim of full upstream support. Node type declarations match the deployed Node 24 runtime.
