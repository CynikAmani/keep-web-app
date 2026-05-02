"use client";

import React, { useState } from "react";
import { useUserStore } from "../store/user.store";
import { useUserActions } from "../hooks/useUserActions";
import { useRoleStore } from "@/features/roles/store/role.store";
import { useRoleActions } from "@/features/roles/hooks/useRoleActions";
import * as ui from "@/config/uiClasses";
import { Search, UserPlus, Filter, X, ChevronDown } from "lucide-react";
import { ActionButton } from "@/features/shared/components/ui/ActionButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserFiltersProps {
  onAddClick: () => void;
}

export function UserFilters({ onAddClick }: UserFiltersProps) {
  const { filters } = useUserStore();
  const { updateFilters } = useUserActions();
  const { roles } = useRoleStore();
  const { fetchInitialData } = useRoleActions();
  
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.search || '');
  
  // Initialize roles data when filter menu opens
  const handleFilterMenuOpen = (open: boolean) => {
    if (open && roles.length === 0) {
      fetchInitialData();
    }
    setIsFilterMenuOpen(open);
  };
  
  // Handle search with debounced effect
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    updateFilters({ search: value });
  };
  
  // Handle status filter
  const handleStatusFilter = (status: 'active' | 'deactivated' | undefined) => {
    updateFilters({ status });
  };
  
  // Handle role filter
  const handleRoleFilter = (roleName: string | undefined) => {
    updateFilters({ role: roleName });
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setLocalSearchTerm('');
  };
  
  // Get active filters count for badge
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search && filters.search.trim() !== '') count++;
    if (filters.status) count++;
    if (filters.role) count++;
    return count;
  };
  
  // Get filter display text
  const getStatusFilterText = () => {
    switch (filters.status) {
      case 'active': return 'Active';
      case 'deactivated': return 'Deactivated';
      default: return 'All Statuses';
    }
  };
  
  const getRoleFilterText = () => {
    if (!filters.role) return 'All Roles';
    const role = roles.find(r => r.name === filters.role);
    return role ? role.name : 'All Roles';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Actions Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className={`${ui.input} pl-10 h-11 pr-4 bg-background`}
            value={localSearchTerm}
            onChange={handleSearchChange}
          />
          {localSearchTerm && (
            <button
              onClick={() => {
                setLocalSearchTerm('');
                updateFilters({ search: '' });
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          {/* Filter Dropdown */}
          <DropdownMenu open={isFilterMenuOpen} onOpenChange={handleFilterMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 gap-2 justify-between bg-background border-border hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <span>Filters</span>
                </div>
                <div className="flex items-center gap-2">
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                  <ChevronDown size={14} className="text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-80 p-2">
              {/* Header */}
              <div className="flex items-center justify-between px-2 py-2">
                <DropdownMenuLabel className="text-sm font-semibold">Filter Users</DropdownMenuLabel>
                {getActiveFiltersCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              
              <DropdownMenuSeparator className="my-1" />
              
              {/* Status Filter */}
              <div className="px-2 py-1">
                <p className="text-xs font-medium text-muted-foreground mb-2">Account Status</p>
                <div className="space-y-1">
                  <DropdownMenuCheckboxItem
                    checked={!filters.status}
                    onCheckedChange={() => handleStatusFilter(undefined)}
                    className="py-2 px-2 cursor-pointer"
                  >
                    <span className="text-sm">All Statuses</span>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status === 'active'}
                    onCheckedChange={() => handleStatusFilter('active')}
                    className="py-2 px-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm">Active</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.status === 'deactivated'}
                    onCheckedChange={() => handleStatusFilter('deactivated')}
                    className="py-2 px-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Deactivated</span>
                    </div>
                  </DropdownMenuCheckboxItem>
                </div>
              </div>
              
              <DropdownMenuSeparator className="my-1" />
              
              {/* Role Filter */}
              <div className="px-2 py-1">
                <p className="text-xs font-medium text-muted-foreground mb-2">Access Role</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <DropdownMenuCheckboxItem
                    checked={!filters.role}
                    onCheckedChange={() => handleRoleFilter(undefined)}
                    className="py-2 px-2 cursor-pointer"
                  >
                    <span className="text-sm">All Roles</span>
                  </DropdownMenuCheckboxItem>
                  {roles.map((role) => (
                    <DropdownMenuCheckboxItem
                      key={role.id}
                      checked={filters.role === role.name}
                      onCheckedChange={() => handleRoleFilter(role.name)}
                      className="py-2 px-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand rounded-full"></div>
                        <span className="text-sm">{role.name}</span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>
              
              {/* Active Filters Summary */}
              {getActiveFiltersCount() > 0 && (
                <>
                  <DropdownMenuSeparator className="my-1" />
                  <div className="px-2 py-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Active Filters</p>
                    <div className="flex flex-wrap gap-1">
                      {filters.search && (
                        <Badge variant="secondary" className="text-xs">
                          Search: "{filters.search}"
                        </Badge>
                      )}
                      {filters.status && (
                        <Badge variant="secondary" className="text-xs">
                          Status: {getStatusFilterText()}
                        </Badge>
                      )}
                      {filters.role && (
                        <Badge variant="secondary" className="text-xs">
                          Role: {getRoleFilterText()}
                        </Badge>
                      )}
                    </div>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add User Button */}
          <ActionButton 
            permission="create-user" 
            variantClassName={ui.btnBrandOutlineMd + " h-11 whitespace-nowrap gap-2 shadow-sm"}
            onClick={onAddClick}
          >
            <UserPlus size={18} /> 
            <span className="hidden sm:inline">Add User</span>
          </ActionButton>
        </div>
      </div>
      
      {/* Active Filters Bar */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border/50">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {filters.search && (
              <Badge variant="secondary" className="text-xs gap-1">
                Search: "{filters.search}"
                <button
                  onClick={() => updateFilters({ search: '' })}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary" className="text-xs gap-1">
                Status: {getStatusFilterText()}
                <button
                  onClick={() => updateFilters({ status: undefined })}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
            {filters.role && (
              <Badge variant="secondary" className="text-xs gap-1">
                Role: {getRoleFilterText()}
                <button
                  onClick={() => updateFilters({ role: undefined })}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X size={10} />
                </button>
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground ml-auto"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}