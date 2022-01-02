export interface CodeBox {
  node_id: number;
  offset: number;
  justification: string;
  txt: string;
  syntax: string;
  width: number;
  height: number;
  is_width_pix: number;
  do_highl_bra: number;
  do_show_linenum: boolean;
}
