import { Box, IconButton, Stack, TextField } from '@mui/material';
import { Icon } from '@ctzhian/ui';
import UploadFile from '@/components/UploadFile';
import {
  CSSProperties,
  Dispatch,
  forwardRef,
  HTMLAttributes,
  SetStateAction,
} from 'react';

type Item = {
  id: string;
  title: string;
  url: string;
  desc: string;
};

export type ItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  item: Item;
  withOpacity?: boolean;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  handleRemove?: (id: string) => void;
  handleUpdateItem?: (item: Item) => void;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    {
      item,
      withOpacity,
      isDragging,
      style,
      dragHandleProps,
      handleRemove,
      handleUpdateItem,
      setIsEdit,
      ...props
    },
    ref,
  ) => {
    const inlineStyles: CSSProperties = {
      opacity: withOpacity ? '0.5' : '1',
      borderRadius: '10px',
      cursor: isDragging ? 'grabbing' : 'grab',
      backgroundColor: '#ffffff',
      width: '100%',
      ...style,
    };
    return (
      <Box ref={ref} style={inlineStyles} {...props}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={0.5}
          sx={{
            py: 1.5,
            px: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '10px',
          }}
        >
          <Stack
            direction={'column'}
            gap={'20px'}
            sx={{
              flex: 1,
              p: 1.5,
            }}
          >
            <UploadFile
              name='url'
              id={`${item.id}_icon`}
              type='url'
              disabled={false}
              accept='image/*'
              width={110}
              height={62}
              value={item.url}
              onChange={(url: string) => {
                const updatedItem = { ...item, url: url };
                handleUpdateItem?.(updatedItem);
                setIsEdit(true);
              }}
            />
            <TextField
              label='标题'
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                height: '36px',
                '& .MuiOutlinedInput-root': {
                  height: '36px',
                  padding: '0 12px',
                  '& .MuiOutlinedInput-input': {
                    padding: '8px 0',
                  },
                },
              }}
              fullWidth
              placeholder='请输入标题'
              variant='outlined'
              value={item.title}
              onChange={e => {
                const updatedItem = { ...item, title: e.target.value };
                handleUpdateItem?.(updatedItem);
                setIsEdit(true);
              }}
            />
            <TextField
              label='描述'
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              multiline
              minRows={2}
              placeholder='请输入描述'
              variant='outlined'
              value={item.desc}
              onChange={e => {
                const updatedItem = { ...item, desc: e.target.value };
                handleUpdateItem?.(updatedItem);
                setIsEdit(true);
              }}
            />
          </Stack>

          <Stack
            direction={'column'}
            sx={{ justifyContent: 'space-between', alignSelf: 'stretch' }}
          >
            <IconButton
              size='small'
              onClick={e => {
                e.stopPropagation();
                handleRemove?.(item.id);
              }}
              sx={{
                color: 'text.tertiary',
                ':hover': { color: 'error.main' },
                width: '28px',
                height: '28px',
              }}
            >
              <Icon type='icon-shanchu2' sx={{ fontSize: '12px' }} />
            </IconButton>
            <IconButton
              size='small'
              sx={{
                cursor: 'grab',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
              {...(dragHandleProps as any)}
            >
              <Icon type='icon-drag' />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    );
  },
);

export default Item;
