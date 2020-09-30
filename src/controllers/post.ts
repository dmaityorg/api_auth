import { User, UserRequestAttributes } from '../models/user';
import { Post, PostAttributes } from '../models/post';
import { Request, Response }  from "express";
import httpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import models from '../models';

export const findAllPost  =  async (req: Request , res: Response , next: any) => {
  try {
    const post = await models.Post.findAll();
    return res.status(200).json(post);
  } catch (error) {
    return next(httpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  }
};

export const createPost = async (req: Request, res: Response, next: any) => { 
  try {
    const post = await models.Post.findOne({
      where: {
        title: req.body.title
      }
    });
    if (post) {
      return res.status(200).json({ 'Message' :"Post already present" });
    }else{
      const postDetails: PostAttributes = req.body;
      const newPost: Post = await models.Post.create(postDetails);
      return res.status(200).json({ 'Message' :"Post successfully created" });
    } 
  } catch (error) {
    return next(httpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  } 
};

export const findPost = async (req:Request, res:Response, next:any) => { 
  try {
    const post = await models.Post.findByPk(req.params.id);
    if (post) {
      return res.status(200).json(post);
    }else{
      return res.status(200).json({ 'Message' :"Can Not find" });
    } 
  } catch (error) {
    return next(httpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  } 
};

export const updatePost = async (req: Request, res: Response, next: any) => { 
  try {
    const post = await models.Post.findByPk(req.params.id);
    if (post) {
      const postDetails: PostAttributes = req.body;
      console.log(postDetails)
      const newPost: Post = await models.Post.update(postDetails, { where: { id: post.id } }, { transaction: true } );
      return res.status(200).json({ 'Post': post, 'Message' : "Post successfully Updated" });
    }else{
      return res.status(200).json({ 'Message' :"Can Not find Post" });
    } 
  } catch (error) {
    return next(httpError(StatusCodes.INTERNAL_SERVER_ERROR, error))
  } 
};