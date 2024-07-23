# Stage 1: Build the application
FROM node:16.17.0-alpine as builder
WORKDIR /app

# Copy package files and install dependencies
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

# Copy the rest of the application code
COPY . .

# Define build arguments
ARG TMDB_V3_API_KEY
ARG API_ENDPOINT_URL

# Set environment variables for the build process
ENV VITE_APP_TMDB_V3_API_KEY=${TMDB_V3_API_KEY}
ENV VITE_APP_API_ENDPOINT_URL=${API_ENDPOINT_URL}

# Verify the environment variables are set (for debugging purposes)
RUN echo "VITE_APP_TMDB_V3_API_KEY=${VITE_APP_TMDB_V3_API_KEY}"
RUN echo "VITE_APP_API_ENDPOINT_URL=${VITE_APP_API_ENDPOINT_URL}"

# Build the application
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the build output from the previous stage
COPY --from=builder /app/dist .

# Expose port 80 and start Nginx
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]