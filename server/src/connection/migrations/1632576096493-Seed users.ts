import { Users } from '../entities/Users';
import {MigrationInterface, QueryRunner, getManager} from 'typeorm';
import { usersArray } from '../seed/Users';

export class SeedUsers1632576096493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const user of usersArray) {
            const seedUser = new Users;
            seedUser.username = user.username;
            getManager().save(Users, seedUser);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
