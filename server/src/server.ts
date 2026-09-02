import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import analyzeImageRouter from "./routes/analyzeImage";
import optimizeRouteRouter from "./routes/optimizeRoute";
import usersRouter from "./routes/users";
import routesRouter from "./routes/routes";
import vehiclesRouter from "./routes/vehicles";

dotenv.config();

const app = express();

const upload = multer({
    storage: multer.memoryStorage(),
});

app.use(cors());

app.use(express.json());

app.get("/", (_request, response) => {
    response.json({
        message: "Servidor RotaCerta funcionando 🚀",
    });
});

app.use(
    "/api/analyze-image",
    upload.single("image"),
    analyzeImageRouter
);

app.use(
    "/api/optimize-route",
    optimizeRouteRouter
);

app.use(
    "/api/users",
    usersRouter
);

app.use(
    "/api/routes",
    routesRouter
);

app.use(
    "/api/vehicles",
    vehiclesRouter
);

const PORT =
    Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `🚀 Servidor rodando na porta ${PORT}`
    );
});