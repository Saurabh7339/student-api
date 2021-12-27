import { Injectable } from '@nestjs/common';
import { Response } from 'express';
const express  = require('express');



@Injectable()
export class AppService {
  getHello(): any {
    return 'Hello World!';
  }
}
