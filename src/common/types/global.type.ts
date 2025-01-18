import { ApiProperty } from '@nestjs/swagger';

export class DockerContainer {
  @ApiProperty({ name: 'id', type: 'string' })
  id: string;

  @ApiProperty({ name: 'name', type: 'string' })
  name: string;

  @ApiProperty({ name: 'image', type: 'string' })
  image: string;

  @ApiProperty({ name: 'state', type: 'string' })
  state: string;

  @ApiProperty({ name: 'status', type: 'string' })
  status: string;
}
