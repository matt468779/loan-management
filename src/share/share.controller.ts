import { Controller } from '@nestjs/common';
import { ShareService } from './share.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { Share } from './entities/share.entity';

@Crud({
  model: {
    type: Share,
  },
  params: {
    certificate_number: {
      field: 'certificate_number',
      type: 'number',
      primary: true,
    },
  },
  query: {
    join: {
      user: {
        alias: 'shareUser',
        eager: true,
      },
    },
  },
})
@Controller('share')
export class ShareController implements CrudController<Share> {
  constructor(public service: ShareService) {}

  get base(): CrudController<Share> {
    return this;
  }

  @Override('getOneBase')
  async getOneAndDoStuff(@ParsedRequest() req: CrudRequest) {
    const share = await this.base.getOneBase(req);

    const now = Date.now();
    const purchase_date = new Date(share.purchase_date);
    const diff = Math.abs(now.valueOf() - purchase_date.valueOf());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    const remainder = diffDays % 30;
    const diffMonths = (diffDays - remainder) / 30 + Number(remainder >= 15);
    const loan_approved = 0.9 * share.amount * diffMonths;

    const result = { ...share, loan_approved: loan_approved };

    return result;
  }
}
