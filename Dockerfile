FROM node:20-alpine

WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Build production bundle
RUN npm run build

# Expose port 3008 (free port on VPS)
EXPOSE 3008

# Start Vite preview server directly with Node on port 3008
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3008"]
