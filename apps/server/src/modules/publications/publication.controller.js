import { HttpStatus } from "../../constants/http.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { publicationsService } from "./publication.service.js";
export const publicationsController = {
  create: asyncHandler(async (req, res) => {
    const publication = await publicationsService.create(req.user, req.body);
    res
      .status(HttpStatus.CREATED)
      .json(new ApiResponse(HttpStatus.CREATED, publication, "Publication created"));
  }),
  getBySlug: asyncHandler(async (req, res) => {
    const publication = await publicationsService.getBySlug(req.params.slug);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, publication, "Publication"));
  }),
  listPublic: asyncHandler(async (_req, res) => {
    const publications = await publicationsService.listPublic();
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, publications, "Publications"));
  }),
  listMine: asyncHandler(async (req, res) => {
    const publications = await publicationsService.listMine(req.user);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, publications, "Your publications"));
  }),
  update: asyncHandler(async (req, res) => {
    const publication = await publicationsService.update(req.user, req.params.id, req.body);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, publication, "Publication updated"));
  }),
  subscribe: asyncHandler(async (req, res) => {
    const result = await publicationsService.subscribe(req.params.slug, req.body, req.user);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, result, "Subscription updated"));
  }),
};
