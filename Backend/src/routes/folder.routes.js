// Folder routes — CRUD for vault folders. All routes require
// authentication (verifyAuth applied globally via router.use below).
import express from "express";
import verifyAuth from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createFolderSchema, updateFolderSchema } from "../validators/folder.validator.js";
import * as folderController from "../controllers/folder.controller.js";

const router = express.Router();

router.use(verifyAuth);

// GET /api/v1/folders/:folderId/passwords — passwords inside a folder.
// Declared before the "/:id" routes so it isn't shadowed by them.
/**
 * @openapi
 * /api/v1/folders/{folderId}/passwords:
 *   get:
 *     summary: List all vault entries inside a folder
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: folderId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Passwords in this folder }
 *       404: { description: Folder not found }
 */
router.get("/:folderId/passwords", folderController.getFolderPasswords);

/**
 * @openapi
 * /api/v1/folders:
 *   get:
 *     summary: List all folders for the authenticated user
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Folder list, each with a passwordCount }
 *   post:
 *     summary: Create a new folder
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               icon: { type: string }
 *               color: { type: string }
 *     responses:
 *       201: { description: Folder created }
 *       409: { description: A folder with this name already exists }
 */
router
  .route("/")
  .get(folderController.getFolders)
  .post(validate(createFolderSchema), folderController.createFolder);

/**
 * @openapi
 * /api/v1/folders/{id}:
 *   get:
 *     summary: Get a single folder by id
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Folder }
 *       404: { description: Folder not found }
 *   put:
 *     summary: Update a folder (renaming cascades onto its passwords' category)
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Folder updated }
 *       404: { description: Folder not found }
 *   delete:
 *     summary: Delete a folder (its passwords fall back to the "General" category)
 *     tags: [Folders]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Folder deleted }
 *       404: { description: Folder not found }
 */
router
  .route("/:id")
  .get(folderController.getFolderById)
  .put(validate(updateFolderSchema), folderController.updateFolder)
  .delete(folderController.deleteFolder);

export default router;
