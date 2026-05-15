import { HttpStatus } from "../../constants/http";
import { asyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { postsService } from "./post.service";

export const postsController = {
  listPublished: asyncHandler(async (req, res) => {
    const result = await postsService.listPublished(req.query as never);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, result.items, "Published posts", {
      nextCursor: result.nextCursor,
    }));
  }),

  getPublished: asyncHandler(async (req, res) => {
    const post = await postsService.getPublished(req.params.slug!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, post, "Published post"));
  }),

  listMine: asyncHandler(async (req, res) => {
    const posts = await postsService.listMine(req.user!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, posts, "Your posts"));
  }),

  create: asyncHandler(async (req, res) => {
    const post = await postsService.create(req.user!, req.body);
    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, post, "Post created"));
  }),

  update: asyncHandler(async (req, res) => {
    const post = await postsService.update(req.user!, req.params.id!, req.body);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, post, "Post updated"));
  }),

  publish: asyncHandler(async (req, res) => {
    const post = await postsService.publish(req.user!, req.params.id!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, post, "Post published"));
  }),

  unpublish: asyncHandler(async (req, res) => {
    const post = await postsService.unpublish(req.user!, req.params.id!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, post, "Post unpublished"));
  }),
};
