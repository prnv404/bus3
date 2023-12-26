import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserService } from "./user.service";
import {
	Commuter,
	CommuterServiceController,
	CommuterServiceControllerMethods,
	CreateCommuterDto,
	Empty,
	FindOneCommuterDto,
	UpdateCommuterDto
} from "@app/common";
import { Observable } from "rxjs";

@Controller()
@CommuterServiceControllerMethods()
export class UserController implements CommuterServiceController {
	constructor(private readonly userService: UserService) {}

	create(createUserDto: CreateCommuterDto) {
		return this.userService.create(createUserDto);
	}

	findAll(request: Empty): Commuter | Promise<Commuter> | Observable<Commuter> {
		throw new Error("not implemented");
	}
	findOne(request: FindOneCommuterDto): Commuter | Promise<Commuter> | Observable<Commuter> {
		throw new Error("not implemented");
	}
	remove(request: FindOneCommuterDto): Commuter | Promise<Commuter> | Observable<Commuter> {
		throw new Error("not implemented");
	}
	update(request: UpdateCommuterDto): Commuter | Promise<Commuter> | Observable<Commuter> {
		throw new Error("not implemented");
	}
}
