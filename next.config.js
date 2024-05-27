const { PHRASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (env) => {
  if (env == PHRASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://christophechiappetta:BwUUh89brKLIheYD@cluster0.1uhyagj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET:
          "chaineAléatoireDeCaractèresPourLaSécuritéDeL'application",
        // A modif avant déploiement
        NEXTAUTH_URL: "http://localhost:3000",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "mycloud.barpat.fun",
          },
        ],
      },
    };
  } else {
    return {
      env: {
        MONGODB_CLIENT:
          "mongodb+srv://christophechiappetta:BwUUh89brKLIheYD@cluster0.1uhyagj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_DATABASE: "threads",
        NEXTAUTH_SECRET:
          "chaineAléatoireDeCaractèresPourLaSécuritéDeL'application",
        // A modif avant déploiement
        NEXTAUTH_URL: "http://localhost:3000",
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "mycloud.barpat.fun",
          },
        ],
      },
    };
  }
};

