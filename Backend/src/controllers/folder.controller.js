// Folder controller — CRUD operations for vault folders.
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as folderService from "../services/folder.service.js";

export const getFolders = asyncHandler(async (req, res) => {
  const folders = await folderService.getFolders(req.user.id);
  return new ApiResponse(200, "Folders fetched successfully.", folders).send(res);
});

export const getFolderById = asyncHandler(async (req, res) => {
  const folder = await folderService.getFolderById(req.user.id, req.params.id);
  return new ApiResponse(200, "Folder fetched successfully.", folder).send(res);
});

export const createFolder = asyncHandler(async (req, res) => {
  const folder = await folderService.createFolder(req.user.id, req.body);
  return new ApiResponse(201, "Folder created successfully.", folder).send(res);
});

export const updateFolder = asyncHandler(async (req, res) => {
  const folder = await folderService.updateFolder(req.user.id, req.params.id, req.body);
  return new ApiResponse(200, "Folder updated successfully.", folder).send(res);
});

export const deleteFolder = asyncHandler(async (req, res) => {
  await folderService.deleteFolder(req.user.id, req.params.id);
  return new ApiResponse(200, "Folder deleted successfully.").send(res);
});

export const getFolderPasswords = asyncHandler(async (req, res) => {
  const passwords = await folderService.getFolderPasswords(req.user.id, req.params.folderId);
  return new ApiResponse(200, "Folder passwords fetched successfully.", passwords).send(res);
});
