import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateCelestialPostInput } from './dto/create-celestial-post.input';
import { UpdateCelestialPostInput } from './dto/update-celestial-post.input';
import { CelestialPostCountModel } from './model/celestial-post-count.model';
import { CelestialPostModel } from './model/celestial-post.model';
import { CreateUserCelestialPostInput } from './dto/create-user-celestial-post.input';
import { DataStatusModel } from 'src/data-status/model/data-status.model';

@Injectable()
export class CelestialPostService {
  constructor(
    @InjectModel(CelestialPostModel)
    private celestialPostModel: typeof CelestialPostModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createPost(
    post: CreateCelestialPostInput,
  ): Promise<CelestialPostModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: post.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${post.status_number} not found`);
    } else {
      const postInput = new CelestialPostModel();
      postInput.image = post.image;
      postInput.title = post.title;
      postInput.description = post.description;
      postInput.metatitle = post.metatitle;
      postInput.metadescription = post.metadescription;
      postInput.status = post.status;
      postInput.userId = post.userId;
      postInput.status_id = getStatus.dataValues.id;
      // postInput.image = post.image;
      const postResults = await this.celestialPostModel.create(
        postInput.dataValues,
      );
      return postResults;
    }
  }

  public async createUserPost(
    userId: string,
    post: CreateUserCelestialPostInput,
  ): Promise<CelestialPostModel> {
    const postInput = new CelestialPostModel();
    postInput.image = post.image;
    postInput.title = post.title;
    postInput.description = post.description;
    postInput.metatitle = post.metatitle;
    postInput.metadescription = post.metadescription;
    postInput.status = post.status;
    postInput.userId = userId;
    // postInput.image = post.image;
    const postResults = await this.celestialPostModel.create(
      postInput.dataValues,
    );
    return postResults;
  }

  public async getPosts(): Promise<Array<CelestialPostModel>> {
    const postsResults = await this.celestialPostModel
      .scope([
        { method: ['users'] },
        { method: ['likes'] },
        { method: ['comments'] },
        { method: ['post_users_likes'] },
        { method: ['posts_users_comments'] },
        { method: ['posts_status'] },
      ])
      .findAll();
    return postsResults;
  }

  public async getPost(id: string): Promise<CelestialPostModel> {
    const postsResults = await this.celestialPostModel
      .scope([
        { method: ['users'] },
        { method: ['likes'] },
        { method: ['comments'] },
        { method: ['post_users_likes'] },
        { method: ['posts_users_comments'] },
        { method: ['posts_status'] },
      ])
      .findOne({ where: { id } });
    return postsResults;
  }

  public async updatePost(
    id: string,
    post: UpdateCelestialPostInput,
  ): Promise<CelestialPostModel> {
    const postInput = await this.celestialPostModel.findOne({ where: { id } });
    if (!postInput) {
      throw new NotFoundException(`user with ${id} not found`);
    } else {
      postInput.image = post.image;
      postInput.title = post.title;
      postInput.description = post.description;
      postInput.metatitle = post.metatitle;
      postInput.metadescription = post.metadescription;
      postInput.status = post.status;

      await this.celestialPostModel.update(postInput.dataValues, {
        where: { id },
      });
      return postInput;
    }
  }

  public async deletePost(id: string): Promise<CelestialPostModel> {
    const postDetails = await this.celestialPostModel.findOne({
      where: { id },
    });
    if (!postDetails) {
      throw new NotFoundException(`user with ${id} not found`);
    } else {
      await this.celestialPostModel.destroy({ where: { id } });
      return postDetails;
    }
  }

  public async postCount(): Promise<CelestialPostCountModel> {
    const count = await this.celestialPostModel.count();
    const count1 = new CelestialPostCountModel();
    count1.count = count;
    return count1;
  }

  public async getUserPosts(id: string): Promise<Array<CelestialPostModel>> {
    const postsResults = await this.celestialPostModel
      .scope([
        { method: ['users'] },
        { method: ['likes'] },
        { method: ['comments'] },
        { method: ['post_users_likes'] },
        { method: ['posts_users_comments'] },
        { method: ['posts_status'] },
      ])
      .findAll({ where: { userId: id } });
    return postsResults;
  }
}
