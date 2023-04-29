import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entity/book.entity';
import { AddBookArgs } from './args/addbook.args';
import { UpdateBookArgs } from './args/updatebook.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
  ) {}

  async findAllBooks(): Promise<BookEntity[]> {
    const books = await this.bookRepo.find();
    return books;
  }

  async findBookById(id: number): Promise<BookEntity> {
    const book = await this.bookRepo.findOne({ where: { id: id } });
    return book;
  }

  async deleteBook(id: number): Promise<String> {
    this.bookRepo.delete(id);
    return 'Book has been deleted';
  }

  async addBook(addBookargs: AddBookArgs) {
    let book: BookEntity = new BookEntity();
    book.title = addBookargs.title;
    book.price = addBookargs.price;
    await this.bookRepo.save(book);
    return 'Book has been Successful added';
  }

  async updateBook(updateBookargs: UpdateBookArgs) {
    let book: BookEntity = await this.bookRepo.findOne({
      where: {
        id: updateBookargs.id,
      },
    });
    console.log(book);
    book.title = updateBookargs.title;
    book.price = updateBookargs.price;
    await this.bookRepo.save(book);
    return 'Book has been Successful Updated';
  }
}
