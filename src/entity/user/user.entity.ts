import { 
    Entity,
    Column, 
    PrimaryGeneratedColumn, 
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idx: number;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;

    @Column({default:false})
    status: boolean;

    @Column({ length: 45 })
    email: string;

    @Column({type: "text"})
    password: string;

    @Column({type: "text"})
    salt: string;

    @Column({length: 15})
    firstName: string;

    @Column({length: 30})
    lastName: string;

    @Column()
    age: number;

    @Column({type: "text"})
    image: string;

    @Column({length:15})
    phoneNumber: string;

    @Column({default:false})
    authStatus: boolean;
}