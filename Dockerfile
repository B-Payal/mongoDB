FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# If you have a build step (e.g., for a React frontend or TypeScript backend)
# RUN npm run build


FROM node:18-alpine AS runner

# Create a non-root user and set permissions (for security)
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
USER appuser
WORKDIR /home/appuser/app # Set working directory for non-root user

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app ./

EXPOSE 3000

# Specify the command to run the application
CMD ["node", "src/index.js"]