# Mixedbread Image Search

This minimal template demonstrates how to build semantic image search with natural language queries using the Mixedbread [Search API](https://www.mixedbread.com/).

## Getting Started

### Prerequisites

- Bun (or Node.js 22+)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mxbai-image-search
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Mixedbread credentials to the `.env` file:

```env
MXBAI_API_KEY=your-api-key-here
MXBAI_STORE_ID=your-store-id
```

**To get your API key and Store ID, you have two options:**

1. **From Vercel Integration** (Recommended if deploying to Vercel):
   - Go to your [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to your project's **Integrations** tab
   - Install or access the [Mixedbread integration](https://vercel.com/marketplace/mixedbread)
   - Copy your API key and Store ID from the integration settings

2. **From Mixedbread Platform** (For standalone use):
   - Visit the [Mixedbread Platform](https://platform.mixedbread.com/platform?next=api-keys)
   - Sign up or log in to your account
   - Navigate to **API Keys** and create a new key
   - Navigate to **Stores** and create a new Store, then copy the Store ID

### 4. Upload Images to Your Store

The project includes a script to upload images to your Mixedbread Store:

```bash
bun scripts/upload-images.ts ./public/images
```

This will process all images in the `./public/images` directory and upload them to your Store.

### 5. Run the Application

Start the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser and start searching for images using natural language queries.

## Learn More

### Mixedbread Resources

- [Mixedbread Documentation](https://www.mixedbread.com/docs) - Learn about Mixedbread's features and APIs
- [Quickstart Guide](https://www.mixedbread.com/docs/quickstart) - Get started with creating Stores and uploading files
- [Mixedbread Discord](https://discord.gg/fCpaq2dr) - Join the community and get support

