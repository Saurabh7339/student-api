import { Controller } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { domainToASCII } from 'url';
import { RecordsController } from './records.controller';
import {RecordsService} from './records.service';
import { Model } from 'mongoose';

describe('RecordsController', () => {
  let controller: RecordsController;
  let controller2:RecordsService;
  const mockUserService = {
    create: jest.fn((dto)=> {
      return {
        _id: Date.now(),
        ...dto,
      }
    }),
   
    findOne:jest.fn((id)=> {
      return {
        _id:Date.now(),
        
      }
    })
    
    
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers:[RecordsService],
    }).overrideProvider(RecordsService).useValue(mockUserService).compile();

    controller = module.get<RecordsController>(RecordsController);
    controller2 = module.get<RecordsService>(RecordsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
    
    it('findAll function should be there ' , async ()  => {
      expect( typeof controller.findAll).toBe('function');
    });
    
    it('should call the findAll function', async () => {
       await controller.findAll();
       expect(controller2.findAll).toBeCalled();
    } )

    it('should get a particular record',async ()=> {
      expect(await controller.findOne('1213213')).toEqual({
        _id: expect.any(Number),
      })
      expect(mockUserService.findOne).toHaveBeenCalledWith('1213213');
    }) ;
    //post 
    it('Create Method Should be defined',async ()=> {
       expect(controller.create).toBeDefined();
    });
    it('FindOne Method Should be defined',async ()=> {
      expect(controller.findOne).toBeDefined();
   });
   it('Soft Delete Method Should be defined',async ()=> {
    expect(controller.softDelete).toBeDefined();
 });

});
