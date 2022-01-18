import slugify from 'slugify';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../core/models/abstract.entity';
// eslint-disable-next-line import/no-cycle
import { Shop } from '../shop/shop.entity';

@ObjectType()
@Entity('products')
export class Product extends AbstractEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  slug: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  unit: string;

  @Field(() => Shop)
  @ManyToOne(() => Shop, shop => shop.products)
  @TypeormLoader()
  shop: Shop;

  @BeforeInsert()
  @BeforeUpdate()
  protected slugifyName(): void {
    this.slug = slugify(this.name, { lower: true });
  }
}
