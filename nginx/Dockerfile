# nginx/Dockerfile
FROM nginx:alpine

# Copy the universal nginx.conf file into the image.
# The `..` is because the build context is the `nginx` directory.
COPY ../nginx.conf /etc/nginx/conf.d/default.conf