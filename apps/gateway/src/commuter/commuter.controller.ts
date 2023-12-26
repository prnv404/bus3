import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CommuterService } from "./commuter.service";
import { CreateCommuterDto, UpdateCommuterDto } from "@app/common";

@Controller("commuter")
export class CommuterController {
	constructor(private readonly commuterService: CommuterService) {}

	@Post()
	create(@Body() createCommuterDto: CreateCommuterDto) {
		return this.commuterService.create(createCommuterDto);
	}

	@Get()
	findAll() {
		return this.commuterService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.commuterService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateCommuterDto: UpdateCommuterDto) {
		return this.commuterService.update(+id, updateCommuterDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.commuterService.remove(+id);
	}
}
