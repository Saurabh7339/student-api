import { Test, TestingModule } from '@nestjs/testing';
import { async } from 'rxjs';
import { domainToASCII } from 'url';
import { RecordsController } from './records.controller';
import {RecordsService} from './records.service';

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
  

  it('should create a Record ', ()=> {
    const dto = {"name":"saurabh kumar","age":24,"fatherName":"mantoon ", "address":"kv 7","contactNumber":9915};
    expect(controller.create(dto)).toEqual({
      _id: expect.any(Number),
      name:dto.name,
      father_name:dto.fatherName,
      address:dto.address,
      contact_no:dto.contactNumber,
      age:dto.age

    })
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
      
    });

    it('should call the getAll api ' , async ()  => {
     
      expect( await controller.findAll).toHaveLength(0);
    });

    it('should get a particular record',async ()=> {
      expect(await controller.findOne('1213213')).toEqual({
        _id: expect.any(Number),
       
      })
      expect(mockUserService.findOne).toHaveBeenCalledWith('1213213');
    })


  
});
