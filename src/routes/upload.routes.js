import express from "express";
import multer from "multer";
import { uploadFileToS3 } from "../controllers/upload-controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado." });
  }

  const result = await uploadFileToS3(req.file);

  if (result.success) {
    res
      .status(200)
      .json({
        message: "Arquivo enviado com sucesso!",
        data: result.data,
        fileUrl: result.fileUrl,
      });
  } else {
    res
      .status(500)
      .json({ message: "Erro ao enviar o arquivo.", error: result.error });
  }
});

export default router;
