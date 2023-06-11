import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogImageInput } from './dto/create-blog-image.input';
import { UpdateBlogImageInput } from './dto/update-blog-image.input';
import { InjectModel } from '@nestjs/sequelize';
import { BlogImageModel } from './model/blog-image.model';
import { DataStatusModel } from 'src/data-status/model/data-status.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BlogImageService {
  constructor(
    @InjectModel(BlogImageModel) private blogImageModel: typeof BlogImageModel,
    @InjectModel(DataStatusModel)
    private dataStatusModel: typeof DataStatusModel,
    private sequelize: Sequelize,
  ) {}

  public async createBlogImage(
    inputs: CreateBlogImageInput,
  ): Promise<BlogImageModel> {
    const getStatus = await this.dataStatusModel.findOne({
      where: { status_number: inputs.status_number },
    });
    if (!getStatus) {
      throw new NotFoundException(`${inputs.status_number} not found`);
    } else {
      const imageInput = new BlogImageModel();
      imageInput.image = inputs.image;
      imageInput.status = inputs.status;
      imageInput.post_id = inputs.post_id;
      imageInput.status_id = getStatus.dataValues.id;
      const imageResult = await this.blogImageModel.create(
        imageInput.dataValues,
      );
      return imageResult;
    }
  }

  public async updateBlogImage(
    id: string,
    inputs: UpdateBlogImageInput,
  ): Promise<BlogImageModel> {
    const findImage = await this.blogImageModel.findOne({ where: { id } });
    if (!findImage) {
      throw new NotFoundException(`${id} not found`);
    } else {
      findImage.image = inputs.image;
      findImage.status = inputs.status;
      await this.blogImageModel.update(findImage.dataValues, { where: { id } });
      return findImage;
    }
  }

  public async deleteBlogImage(id: string): Promise<BlogImageModel> {
    const findImage = await this.blogImageModel.findOne({ where: { id } });
    if (!findImage) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.blogImageModel.destroy({ where: { id } });
      return findImage;
    }
  }

  public async getBlogImage(id: string): Promise<BlogImageModel> {
    const findImage = await this.blogImageModel
      .scope([{ method: ['blog_image_status'] }, { method: ['posts'] }])
      .findOne({ where: { id } });
    if (findImage !== null) {
      return findImage;
    } else {
      throw new NotFoundException(`${id} not found`);
    }
  }

  public async getBlogImages(): Promise<Array<BlogImageModel>> {
    const findImage = await this.blogImageModel
      .scope([{ method: ['blog_image_status'] }, { method: ['posts'] }])
      .findAll();
    return findImage;
  }
}
