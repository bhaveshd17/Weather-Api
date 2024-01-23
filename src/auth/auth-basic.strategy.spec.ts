import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BasicStrategy } from './auth-basic.strategy';
import { PassportModule } from '@nestjs/passport';

describe('BasicStrategy', () => {
  let basicStrategy: BasicStrategy;

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        BasicStrategy,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    basicStrategy = module.get<BasicStrategy>(BasicStrategy);
  });

  it('should be defined', () => {
    expect(basicStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return true for valid credentials', async () => {
      process.env.HTTP_ADMIN_USER = 'bhavesh';
      process.env.HTTP_ADMIN_PASS = 'password123';

      const result = await basicStrategy.validate(null, 'bhavesh', 'password123');

      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      process.env.HTTP_ADMIN_USER = 'bhavesh';
      process.env.HTTP_ADMIN_PASS = 'password123';


      const invalidUsername = 'invalid_user';
      const invalidPassword = 'invalid_password';

      await expect(basicStrategy.validate(null, invalidUsername, invalidPassword)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
