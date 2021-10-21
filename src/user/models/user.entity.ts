import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25, nullable: false , unique: true})
    userName: string;

    @Column({ length: 25, nullable: false })
    firstName: string;

    @Column({ length: 25, nullable: false })
    lastName: string;

    @Column({ length: 256, nullable: false })
    password: string;

    @Column({ nullable: false })
    birthdate: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }


}