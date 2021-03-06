import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'location',
        protoPath: join(__dirname, './location.proto'),
    },
  };